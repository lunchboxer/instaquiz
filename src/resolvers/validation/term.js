exports.checkOrder = async (startDate, endDate, id, { prisma }) => {
  if (!startDate && !endDate) return false
  if (id && (!startDate || !endDate)) {
    const thisterm = await prisma.term({ id })
    startDate = !startDate ? thisterm.startDate : startDate
    endDate = !endDate ? thisterm.endDate : endDate
  }
  if (startDate >= endDate) {
    throw new Error(`Start date (${startDate}) is after end date (${endDate})`)
  }
}

exports.checkConflicts = async (startDate, endDate, id, { prisma }) => {
  if (!startDate && !endDate) return false
  if (startDate) {
    const startConflicts = await prisma.terms({
      where: {
        // new startDate is during existing term
        AND: [
          { startDate_lte: startDate },
          { endDate_gte: startDate },
          { id_not: id }
        ]
      }
    })
    if (startConflicts.length) {
      throw new Error(
        `Start date overlaps with term '${startConflicts[0].name}'`
      )
    }
  }
  if (endDate) {
    const endConflicts = await prisma.terms({
      where: {
        // new endDate is during existing term
        AND: [
          { startDate_lte: endDate },
          { endDate_gte: endDate },
          { id_not: id }
        ]
      }
    })
    if (endConflicts.length) {
      throw new Error(`End date overlaps with term '${endConflicts[0].name}'`)
    }
  }

  // updating only one date
  // need to get both to check if surrounds another term
  if (id && (!startDate || !endDate)) {
    const thisterm = await prisma.term({ id })
    startDate = !startDate ? thisterm.startDate : startDate
    endDate = !endDate ? thisterm.endDate : endDate
  }
  if (endDate && startDate) {
    const insideConflicts = await prisma.terms({
      where: {
        AND: [
          { startDate_gte: startDate },
          { endDate_lte: endDate },
          { id_not: id }
        ]
      }
    })
    if (insideConflicts.length) {
      throw new Error(`Dates include term '${insideConflicts[0].name}'`)
    }
  }
}

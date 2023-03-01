interface FullName {
  name: string
  surname: string
  patronymic: string
}

export const createShortName = (fullName: FullName) => {
  return `${fullName.surname} ${fullName.name}`
  //`${
  //     fullName.surname
  //   } ${fullName.name[0].toUpperCase()}. ${fullName.patronymic[0].toUpperCase()}.`
}

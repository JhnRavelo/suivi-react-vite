import { CheckBox } from "../components/Form/Form"

const useCheckBox = () => {
    const checkBox = (setCheckbox: CheckBox | undefined, res: {name: string}[]) => {
        if(setCheckbox){
          const checkboxUsers = res.map((item) => {
              return item.name
            })
          setCheckbox(checkboxUsers)
      }
    }
    return checkBox
}

export default useCheckBox

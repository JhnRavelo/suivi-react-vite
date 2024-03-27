import { CheckBox } from "../components/Form/Form";
import { ProductTypes } from "../context/ProductTypeContext";
import { Users } from "../context/UserContext";
import { isUser } from "../utils/verificationType";

const useCheckBox = () => {
  const checkBox = (
    setCheckbox: CheckBox | undefined,
    res: Users | ProductTypes
  ) => {
    if (setCheckbox) {
      const checkboxUsers = res
        .filter((item) => {
          if (isUser(item)) {
            return item.email !== null
          } else {
            return item
          }
        })
        .map((item) => {
          return item.name;
        }).filter(item => item !== undefined);
      setCheckbox(checkboxUsers);
    }
  };
  return checkBox;
};

export default useCheckBox;

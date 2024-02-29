import useProductType from "./useProductType"
import useUser from "./useUser"

const useExtractId = () => {
    const userContext = useUser()
    const productTypeContext = useProductType()
    const extract = (compare: string, value: "tech" | "type") => {
        let id
        if (value == "tech") id = userContext?.users?.filter(item => item.name == compare)[0].id
        else id = productTypeContext?.types?.filter(item => item.name == compare)[0].id
        return id
    }
    return extract
}

export default useExtractId

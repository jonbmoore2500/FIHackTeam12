import { useParams } from "react-router-dom"
function ResourceByID() {
    const {id} = useParams()
    return <h1>resource number {id}</h1>
}

export default ResourceByID
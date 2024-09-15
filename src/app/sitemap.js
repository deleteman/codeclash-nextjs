import { getAllComparisonIds, getAllStacks } from "@/lib/utils";

const HOST = "https://www.code-clash.net"

export default async function Sitemap() {
    const data = [...getAllComparisonIds(), ...getAllStacks()]
    return data.map(comp => {
        const subfolder = comp.params.id ? 'articles' : 'stacks'
        return {
            url: HOST + `/${subfolder}/` + (comp.params.id || comp.params.code),
            changeFrequency: 'daily',
            priority: 1
        }
    })

}
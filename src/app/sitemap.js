import { getAllComparisonIds } from "@/lib/utils";

const HOST = "https://www.code-clash.net"

export default async function Sitemap() {
    const data = getAllComparisonIds()
    return data.map(comp => {
        return {
            url: HOST + '/articles/' + comp.params.id,
            changeFrequency: 'monthly',
            priority: 1
        }
    })

}
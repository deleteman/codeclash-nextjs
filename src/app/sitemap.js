import { getAllComparisonIds, getAllStacks, getAllParadigms } from "@/lib/utils";

const HOST = "https://www.code-clash.net"

function getSubfolder(comp) {
    console.log(comp)
    switch(comp.type) {
       case 'article': {
        return 'articles';
       }
       case 'stack': {
        return 'stacks';
       }
       case 'paradigm': {
        return 'paradigms';
       }
       default: return 'articles';
    }
}

export default async function Sitemap() {
    const data = [...getAllComparisonIds(), ...getAllStacks(), ...getAllParadigms()]
    return data.map(comp => {
        const subfolder = getSubfolder(comp.params)
        return {
            url: HOST + `/${subfolder}/` + (comp.params.id || comp.params.code),
            changeFrequency: 'daily',
            priority: 1
        }
    })

}
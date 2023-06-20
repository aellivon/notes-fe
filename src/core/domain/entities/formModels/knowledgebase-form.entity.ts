export interface IFormKnowledgebaseFields {
    title: string
    description: string
    owner?: number
    isPublic?: boolean
} 

export interface IFormKnowledgebaseErrors {
    nonFieldErrors?: string,
    title: string
    description: string
    owner?: number
    isPublic?: boolean
}

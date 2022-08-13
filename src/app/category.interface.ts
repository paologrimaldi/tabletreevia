export class Category{
    id: number;
    name: string;
    enabled: boolean = true;
}

export interface CategoryResponse {
    trivia_categories: Array<Category>
}

export interface CategorySelection {
    tier: number,
    category: Category,
    remaining: number
} 
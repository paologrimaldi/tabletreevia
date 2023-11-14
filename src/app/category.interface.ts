export class Category{
    id: number;
    name: string;
    enabled: boolean = true;
    tiers: Array<number> = [100,200,300,400,500];
}

export interface CategoryResponse {
    trivia_categories: Array<Category>
}

export interface CategorySelection {
    tier: number,
    category: Category,
    remaining: number
} 
export interface MediaItemI {
    location: string;
    elements: string[];
}

export interface MenuI {
    name: string;
    elements: MenuIitemI[];
}

export interface MenuIitemI {
    code: string;
    name: string;
    pos: number;
}

export interface PostI {
    name: string;
}

export interface PageI {
    group: string;
    id: string;
    title: string;
    content: string;
}

export interface UserI {
    name: string;
}
export interface CustomI {
    name: string;
    content: string;
}

export interface CommentI {
    name: string;
    content: string;
}

export interface SiteSchemaI {
    content: {
        id: string;
        lang: string;
        header: string;
        subHeader: string;
        tagLine: string;
        logoImage: string;
        logoUrl: string;
        comments: CommentI[];
        media: MediaItemI[];
        menus: MenuI[];
        posts: PostI[];
        pages: PageI[];
        users: UserI[];
        custom: CustomI[];
    };
}
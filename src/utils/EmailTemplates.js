import {
    FourImg,
    FourImgHorizontal,
    FourImgVertical,
    ThreeImg
} from './gallery/index.js'

import {
    Cart,
    FourCard,
    OneLeft,
    OneProduct,
    ThreeCardRow
} from './ecommerce/index.js'

import {
    TwoCardArticle,
    TwoAuthorArticle,
    SingleAuthorArticle,
    RightImgArticle,
    ArticleWithImg,
    ArticleImgBg
} from './articles/index.js'

export const templates = [
    {
        id: 'gallery-section',
        name: "Gallery",
        catagoryTemplates: [
            {
                id: 'gallery-grid-4',
                templateName: 'Four images in a grid',
                templateStyle: FourImg
            },
            {
                id: 'gallery-horizontal',
                templateName: 'Images on horizontal grid',
                templateStyle: FourImgHorizontal
            },
            {
                id: 'gallery-vertical',
                templateName: 'Images on vertical grid',
                templateStyle: FourImgVertical
            },
            {
                id: 'gallery-three-col',
                templateName: 'Three columns with images',
                templateStyle: ThreeImg
            },
        ]
    },
    {
        id: 'ecommerce-section',
        name: "Ecommerce",
        catagoryTemplates: [
            {
                id: 'ecom-single-product',
                templateName: 'One product',
                templateStyle: Cart
            },
            {
                id: 'ecom-product-left',
                templateName: 'One product with image on the left',
                templateStyle: FourCard
            },
            {
                id: 'ecom-three-cards',
                templateName: 'Title + three cards in a row',
                templateStyle: OneLeft
            },
            {
                id: 'ecom-four-cards',
                templateName: 'Title + four cards',
                templateStyle: OneProduct
            },
            {
                id: 'ecom-checkout',
                templateName: 'Checkout',
                templateStyle: ThreeCardRow
            },
        ]
    },
    {
        id: 'articles-section',
        name: "Articles",
        catagoryTemplates: [
            {
                id: 'article-with-image',
                templateName: 'Article with image',
                templateStyle: TwoCardArticle
            },
            {
                id: 'article-bg-image',
                templateName: 'Article with image as background',
                templateStyle: TwoAuthorArticle
            },
            {
                id: 'article-right-image',
                templateName: 'Article with image on right',
                templateStyle: SingleAuthorArticle
            },
            {
                id: 'article-two-cards',
                templateName: 'Article with two cards',
                templateStyle: RightImgArticle
            },
            {
                id: 'article-single-author',
                templateName: 'Article with single author',
                templateStyle: ArticleWithImg
            },
            {
                id: 'article-multiple-authors',
                templateName: 'Article with multiple authors',
                templateStyle: ArticleImgBg
            },
        ]
    },
]
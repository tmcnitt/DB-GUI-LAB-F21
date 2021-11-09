export class Article {
    constructor(title, url, is_opinion_piece, is_verified, summary, author_name) {
        this.title = title;
        this.url = url;
        this.is_opinion_piece = is_opinion_piece;
        this.is_verified = is_verified;
        this.summary = summary;
        this.author_name = author_name;
    }
}
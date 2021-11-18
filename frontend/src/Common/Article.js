export class Article {
    constructor(title, url, is_opinion_piece, is_verified, summary, author_first_name, author_last_name, source_id) {
        this.title = title;
        this.url = url;
        this.is_opinion_piece = is_opinion_piece;
        this.is_verified = is_verified;
        this.summary = summary;
        this.author_first_name = author_first_name;
        this.author_last_name = author_last_name;
        this.source_id = source_id;
    }
}
/**
 * Model class representing search data in the application.
 * It includes properties for the country, date, term, and limit of search queries.
 */
export class SearchDataModel {
  /**
   * The selected country for the search query.
   */
  country: string = "";

  /**
   * The date associated with the search query.
   */
  date: string = "";

  /**
   * The search term used in the query.
   */
  term: string = "";

  /**
   * The limit on the number of results for the search query.
   */
  limit: number = 0;
}


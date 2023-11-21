/**
 * Model representing a user query.
 * @property {number} id - Unique identifier for the query.
 * @property {string} queryName - Name of the query.
 * @property {string} description - Description of the query.
 * @property {Date} date - Date when the query was created.
 * @property {string} searchTerm - Search term used in the query.
 * @property {string} country - Country associated with the query.
 * @property {number} recordCount - Number of records in the query.
 * @property {string} user - Username of the owner of the query.
 * @property {number} userId - User ID associated with the query.
 */
export class QueryModel {
  id: number = 0;
  queryName: string = '';
  description: string = '';
  date: Date = new Date();
  searchTerm: string = '';
  country: string = '';
  recordCount: number = 0;
  user: string = '';
  userId: number = 0;
}

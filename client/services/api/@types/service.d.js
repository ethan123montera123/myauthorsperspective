/**
 * @namespace Service
 *
 * @typedef   {object}  ServiceInclusion
 * @property  {number}  id
 * @property  {string}  name
 *
 * @typedef   {object}  Service
 * @property  {string}  id
 * @property  {string}  title
 * @property  {number}  unitPrice
 * @property  {ServiceInclusion[]} inclusions
 *
 * @typedef   {object}   ServiceOrder
 * @property  {string}   service      ID of the service.
 * @property  {number[]} [inclusions] ID of the inclusions.
 * @property  {number}   [quantity]
 */
export {};

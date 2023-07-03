/**
 * @namespace Service
 *
 * @typedef   {object}              ServiceInclusion
 * @property  {number}              id
 * @property  {string}              tier
 * @property  {string}              name
 *
 * @typedef   {object}              PriceTierInfo
 * @property  {number}              level
 * @property  {number}              price
 *
 * @typedef   {object}              Service
 * @property  {string}              id
 * @property  {string}              title
 * @property  {ServiceInclusion[]}  inclusions
 * @property  {{ default: string } & Record<string, PriceTierInfo>} priceTier
 *
 * @typedef   {object}              ServiceOrder
 * @property  {string}              service      ID of the service.
 * @property  {string[]}            [inclusions] ID of the inclusions.
 * @property  {number}              [quantity]
 */
export {};

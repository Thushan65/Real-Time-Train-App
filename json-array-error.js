/* Directives */
"use strict";

/* Exported Class Definition */
export default class JSONArrayError extends Error
{
        constructor(msg)
            {
            super(msg);
            this.name = this.constructor.name;
            this.code = "ERR_INVALID_ARRAY";
            Error.captureStackTrace(this, this.constructor);
            }
}
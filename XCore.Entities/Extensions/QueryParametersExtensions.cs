using System;
using System.Collections.Generic;
using System.Linq;

namespace XCore.Entities.Extensions
{
    public static class QueryParametersExtensions
    {
        public static bool HasPrevious(this QueryParameters queryParameters) => queryParameters.Page > 1;

        public static bool HasNext(this QueryParameters queryParameters, int totalCount) => queryParameters.Page < (int)queryParameters.GetTotalPages(totalCount);

        public static double GetTotalPages(this QueryParameters queryParameters, int totalCount) => Math.Ceiling((double)totalCount / (double)queryParameters.PageCount);

        public static bool HasQuery(this QueryParameters queryParameters) => !string.IsNullOrEmpty(queryParameters.Query);

        public static bool IsDescending(this QueryParameters queryParameters) => !string.IsNullOrEmpty(queryParameters.OrderBy) && ((IEnumerable<string>)queryParameters.OrderBy.Split(' ')).Last<string>().ToLowerInvariant().StartsWith("desc");
    }
}

namespace XCore.Entities.Extensions
{
    public class QueryParameters
    {
        private const int maxPageCount = 50;
        private int _pageCount = 50;

        public int Page { get; set; } = 1;

        public int PageCount
        {
            get => this._pageCount;
            set => this._pageCount = value > 50 ? 50 : value;
        }

        public string Query { get; set; }

        public string OrderBy { get; set; } = "LastName";
    }
}

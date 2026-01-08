using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace TaskManager.Swagger
{
    public class AddUserIdHeaderParameter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation.Parameters == null)
                operation.Parameters = new List<OpenApiParameter>();

            operation.Parameters.Add(new OpenApiParameter
            {
                Name = "X-User-Id",
                In = ParameterLocation.Header,
                Description = "User ID",
                Required = true,
                Schema = new OpenApiSchema
                {
                    Type = "integer",
                    Default = new Microsoft.OpenApi.Any.OpenApiInteger(1)
                }
            });
        }
    }
}

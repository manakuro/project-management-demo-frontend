package graphqlutil

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
)

// GetRequestedFields gets requested field
func GetRequestedFields(ctx context.Context) []string {
	return getNestedRequestedFields(
		graphql.GetOperationContext(ctx),
		graphql.CollectFieldsCtx(ctx, nil),
		"",
	)
}

func getNestedRequestedFields(ctx *graphql.OperationContext, fields []graphql.CollectedField, prefix string) (requestedFields []string) {
	for _, column := range fields {
		prefixColumn := getRequestedFieldString(prefix, column.Name)
		requestedFields = append(requestedFields, prefixColumn)
		requestedFields = append(requestedFields, getNestedRequestedFields(ctx, graphql.CollectFields(ctx, column.Selections, nil), prefixColumn)...)
	}
	return
}

func getRequestedFieldString(prefix, name string) string {
	if len(prefix) > 0 {
		return prefix + "." + name
	}
	return name
}

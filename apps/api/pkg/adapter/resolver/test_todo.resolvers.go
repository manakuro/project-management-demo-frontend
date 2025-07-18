package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/util/datetime"
)

func (r *mutationResolver) CreateTestTodo(ctx context.Context, input ent.CreateTestTodoInput) (*ent.TestTodo, error) {
	t, err := r.controller.TestTodo.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *mutationResolver) UpdateTestTodo(ctx context.Context, input ent.UpdateTestTodoInput) (*ent.TestTodo, error) {
	t, err := r.controller.TestTodo.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TestTodo(ctx context.Context, where *ent.TestTodoWhereInput) (*ent.TestTodo, error) {
	t, err := r.controller.TestTodo.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TestTodos(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TestTodoWhereInput) (*ent.TestTodoConnection, error) {
	ts, err := r.controller.TestTodo.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ts, nil
}

func (r *testTodoResolver) CreatedAt(ctx context.Context, obj *ent.TestTodo) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *testTodoResolver) UpdatedAt(ctx context.Context, obj *ent.TestTodo) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *testTodoResolver) DueDate(ctx context.Context, obj *ent.TestTodo) (string, error) {
	if obj.DueDate == nil {
		return "", nil
	}

	return datetime.FormatDate(*obj.DueDate), nil
}

// TestTodo returns generated.TestTodoResolver implementation.
func (r *Resolver) TestTodo() generated.TestTodoResolver { return &testTodoResolver{r} }

type testTodoResolver struct{ *Resolver }

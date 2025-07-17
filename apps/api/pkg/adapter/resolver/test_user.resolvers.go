package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/util/datetime"
	"project-management-demo-backend/pkg/util/subscription"
)

func (r *mutationResolver) CreateTestUser(ctx context.Context, input ent.CreateTestUserInput) (*ent.TestUser, error) {
	t, err := r.controller.TestUser.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *mutationResolver) CreateTestUserAndTodo(ctx context.Context, input ent.CreateTestUserInput) (*ent.TestUser, error) {
	t, err := r.controller.TestUser.CreateWithTodo(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *mutationResolver) UpdateTestUser(ctx context.Context, input ent.UpdateTestUserInput) (*ent.TestUser, error) {
	t, err := r.controller.TestUser.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	for _, tu := range r.subscriptions.TestUserUpdated {
		if tu.ID == t.ID {
			tu.Ch <- t
		}
	}

	return t, nil
}

func (r *queryResolver) TestUser(ctx context.Context, id ulid.ID, age *int) (*ent.TestUser, error) {
	t, err := r.controller.TestUser.Get(ctx, id, age)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TestUsers(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TestUserWhereInput) (*ent.TestUserConnection, error) {
	ts, err := r.controller.TestUser.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ts, nil
}

func (r *subscriptionResolver) TestUserUpdated(ctx context.Context, id ulid.ID) (<-chan *ent.TestUser, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TestUser, 1)

	r.mutex.Lock()
	r.subscriptions.TestUserUpdated[key] = subscription.TestUserUpdated{
		ID: id,
		Ch: ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TestUserUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *testUserResolver) CreatedAt(ctx context.Context, obj *ent.TestUser) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *testUserResolver) UpdatedAt(ctx context.Context, obj *ent.TestUser) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TestUser returns generated.TestUserResolver implementation.
func (r *Resolver) TestUser() generated.TestUserResolver { return &testUserResolver{r} }

type testUserResolver struct{ *Resolver }

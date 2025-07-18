package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/util/datetime"
	"project-management-demo-backend/pkg/util/subscription"
)

func (r *mutationResolver) CreateTeammateTaskColumn(ctx context.Context, input ent.CreateTeammateTaskColumnInput) (*ent.TeammateTaskColumn, error) {
	t, err := r.controller.TeammateTaskColumn.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) UpdateTeammateTaskColumn(ctx context.Context, input ent.UpdateTeammateTaskColumnInput) (*ent.TeammateTaskColumn, error) {
	t, err := r.controller.TeammateTaskColumn.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TeammateTaskColumnUpdated {
			if u.ID == t.ID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) UpdateTeammateTaskColumnOrder(ctx context.Context, input model.UpdateTeammateTaskColumnOrderInput) ([]*ent.TeammateTaskColumn, error) {
	ts, err := r.controller.TeammateTaskColumn.UpdateOrder(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *queryResolver) TeammateTaskColumn(ctx context.Context, where *ent.TeammateTaskColumnWhereInput) (*ent.TeammateTaskColumn, error) {
	t, err := r.controller.TeammateTaskColumn.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TeammateTaskColumns(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TeammateTaskColumnWhereInput) (*ent.TeammateTaskColumnConnection, error) {
	ts, err := r.controller.TeammateTaskColumn.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TeammateTaskColumnUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.TeammateTaskColumn, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TeammateTaskColumn, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskColumnUpdated[key] = subscription.TeammateTaskColumnUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskColumnUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *teammateTaskColumnResolver) CreatedAt(ctx context.Context, obj *ent.TeammateTaskColumn) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *teammateTaskColumnResolver) UpdatedAt(ctx context.Context, obj *ent.TeammateTaskColumn) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TeammateTaskColumn returns generated.TeammateTaskColumnResolver implementation.
func (r *Resolver) TeammateTaskColumn() generated.TeammateTaskColumnResolver {
	return &teammateTaskColumnResolver{r}
}

type teammateTaskColumnResolver struct{ *Resolver }

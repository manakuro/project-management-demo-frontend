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

func (r *mutationResolver) CreateTaskFile(ctx context.Context, input ent.CreateTaskFileInput) (*ent.TaskFile, error) {
	t, err := r.controller.TaskFile.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) UpdateTaskFile(ctx context.Context, input ent.UpdateTaskFileInput) (*ent.TaskFile, error) {
	t, err := r.controller.TaskFile.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TaskFileUpdated {
			if u.ID == t.ID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *queryResolver) TaskFile(ctx context.Context, where *ent.TaskFileWhereInput) (*ent.TaskFile, error) {
	t, err := r.controller.TaskFile.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TaskFiles(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskFileWhereInput) (*ent.TaskFileConnection, error) {
	ts, err := r.controller.TaskFile.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TaskFileUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.TaskFile, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TaskFile, 1)

	r.mutex.Lock()
	r.subscriptions.TaskFileUpdated[key] = subscription.TaskFileUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskFileUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *taskFileResolver) CreatedAt(ctx context.Context, obj *ent.TaskFile) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskFileResolver) UpdatedAt(ctx context.Context, obj *ent.TaskFile) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskFile returns generated.TaskFileResolver implementation.
func (r *Resolver) TaskFile() generated.TaskFileResolver { return &taskFileResolver{r} }

type taskFileResolver struct{ *Resolver }

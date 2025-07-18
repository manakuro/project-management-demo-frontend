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

func (r *mutationResolver) CreateTaskSection(ctx context.Context, input ent.CreateTaskSectionInput) (*ent.TaskSection, error) {
	t, err := r.controller.TaskSection.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *mutationResolver) UpdateTaskSection(ctx context.Context, input ent.UpdateTaskSectionInput) (*ent.TaskSection, error) {
	t, err := r.controller.TaskSection.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TaskSectionUpdated {
			if u.ID == t.ID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *queryResolver) TaskSection(ctx context.Context, where *ent.TaskSectionWhereInput) (*ent.TaskSection, error) {
	t, err := r.controller.TaskSection.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *queryResolver) TaskSections(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskSectionWhereInput) (*ent.TaskSectionConnection, error) {
	ts, err := r.controller.TaskSection.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TaskSectionUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.TaskSection, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TaskSection, 1)

	r.mutex.Lock()
	r.subscriptions.TaskSectionUpdated[key] = subscription.TaskSectionUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskSectionUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *taskSectionResolver) CreatedAt(ctx context.Context, obj *ent.TaskSection) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskSectionResolver) UpdatedAt(ctx context.Context, obj *ent.TaskSection) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskSection returns generated.TaskSectionResolver implementation.
func (r *Resolver) TaskSection() generated.TaskSectionResolver { return &taskSectionResolver{r} }

type taskSectionResolver struct{ *Resolver }

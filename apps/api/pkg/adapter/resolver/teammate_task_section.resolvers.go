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

func (r *mutationResolver) CreateTeammateTaskSection(ctx context.Context, input ent.CreateTeammateTaskSectionInput) (*ent.TeammateTaskSection, error) {
	t, err := r.controller.TeammateTaskSection.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, c := range r.subscriptions.TeammateTaskSectionCreated {
			if c.TeammateID == t.TeammateID && c.WorkspaceID == t.WorkspaceID && c.RequestID != input.RequestID {
				c.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) UpdateTeammateTaskSection(ctx context.Context, input ent.UpdateTeammateTaskSectionInput) (*ent.TeammateTaskSection, error) {
	t, err := r.controller.TeammateTaskSection.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TeammateTaskSectionUpdated {
			if u.TeammateID == t.TeammateID && u.WorkspaceID == *input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) DeleteTeammateTaskSection(ctx context.Context, input model.DeleteTeammateTaskSectionInput) (*ent.TeammateTaskSection, error) {
	t, err := r.controller.TeammateTaskSection.Delete(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, d := range r.subscriptions.TeammateTaskSectionDeleted {
			if d.TeammateID == t.TeammateID && d.WorkspaceID == t.WorkspaceID && d.RequestID != input.RequestID {
				d.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) DeleteTeammateTaskSectionAndKeepTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndKeepTasksInput) (*model.DeleteTeammateTaskSectionAndKeepTasksPayload, error) {
	p, err := r.controller.TeammateTaskSection.DeleteAndKeepTasks(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, d := range r.subscriptions.TeammateTaskSectionDeletedAndKeepTasks {
			if d.TeammateID == p.TeammateTaskSection.TeammateID && d.WorkspaceID == p.TeammateTaskSection.WorkspaceID && d.RequestID != input.RequestID {
				d.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *mutationResolver) DeleteTeammateTaskSectionAndDeleteTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndDeleteTasksInput) (*model.DeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	p, err := r.controller.TeammateTaskSection.DeleteAndDeleteTasks(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, d := range r.subscriptions.TeammateTaskSectionDeletedAndDeleteTasks {
			if d.TeammateID == p.TeammateTaskSection.TeammateID && d.WorkspaceID == p.TeammateTaskSection.WorkspaceID && d.RequestID != input.RequestID {
				d.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *mutationResolver) UndeleteTeammateTaskSectionAndKeepTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndKeepTasksInput) (*model.UndeleteTeammateTaskSectionAndKeepTasksPayload, error) {
	p, err := r.controller.TeammateTaskSection.UndeleteAndKeepTasks(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TeammateTaskSectionUndeletedAndKeepTasks {
			if u.TeammateID == input.TeammateID && u.WorkspaceID == input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *mutationResolver) UndeleteTeammateTaskSectionAndDeleteTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndDeleteTasksInput) (*model.UndeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	p, err := r.controller.TeammateTaskSection.UndeleteAndDeleteTasks(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TeammateTaskSectionUndeletedAndDeleteTasks {
			if u.TeammateID == input.TeammateID && u.WorkspaceID == input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *queryResolver) TeammateTaskSection(ctx context.Context, where *ent.TeammateTaskSectionWhereInput) (*ent.TeammateTaskSection, error) {
	t, err := r.controller.TeammateTaskSection.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TeammateTaskSections(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TeammateTaskSectionWhereInput) (*ent.TeammateTaskSectionConnection, error) {
	ts, err := r.controller.TeammateTaskSection.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TeammateTaskSectionUpdated(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *ent.TeammateTaskSection, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TeammateTaskSection, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskSectionUpdated[key] = subscription.TeammateTaskSectionUpdated{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskSectionUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TeammateTaskSectionCreated(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *ent.TeammateTaskSection, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TeammateTaskSection, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskSectionCreated[key] = subscription.TeammateTaskSectionCreated{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskSectionCreated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TeammateTaskSectionDeleted(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *ent.TeammateTaskSection, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TeammateTaskSection, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskSectionDeleted[key] = subscription.TeammateTaskSectionDeleted{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskSectionDeleted, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TeammateTaskSectionDeletedAndKeepTasks(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *model.DeleteTeammateTaskSectionAndKeepTasksPayload, error) {
	key := subscription.NewKey()
	ch := make(chan *model.DeleteTeammateTaskSectionAndKeepTasksPayload, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskSectionDeletedAndKeepTasks[key] = subscription.TeammateTaskSectionDeletedAndKeepTasks{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskSectionDeletedAndKeepTasks, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TeammateTaskSectionDeletedAndDeleteTasks(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *model.DeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	key := subscription.NewKey()
	ch := make(chan *model.DeleteTeammateTaskSectionAndDeleteTasksPayload, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskSectionDeletedAndDeleteTasks[key] = subscription.TeammateTaskSectionDeletedAndDeleteTasks{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskSectionDeletedAndDeleteTasks, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TeammateTaskSectionUndeletedAndKeepTasks(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *model.UndeleteTeammateTaskSectionAndKeepTasksPayload, error) {
	key := subscription.NewKey()
	ch := make(chan *model.UndeleteTeammateTaskSectionAndKeepTasksPayload, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskSectionUndeletedAndKeepTasks[key] = subscription.TeammateTaskSectionUndeletedAndKeepTasks{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskSectionUndeletedAndKeepTasks, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TeammateTaskSectionUndeletedAndDeleteTasks(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *model.UndeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	key := subscription.NewKey()
	ch := make(chan *model.UndeleteTeammateTaskSectionAndDeleteTasksPayload, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskSectionUndeletedAndDeleteTasks[key] = subscription.TeammateTaskSectionUndeletedAndDeleteTasks{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskSectionUndeletedAndDeleteTasks, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *teammateTaskSectionResolver) CreatedAt(ctx context.Context, obj *ent.TeammateTaskSection) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *teammateTaskSectionResolver) UpdatedAt(ctx context.Context, obj *ent.TeammateTaskSection) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TeammateTaskSection returns generated.TeammateTaskSectionResolver implementation.
func (r *Resolver) TeammateTaskSection() generated.TeammateTaskSectionResolver {
	return &teammateTaskSectionResolver{r}
}

type teammateTaskSectionResolver struct{ *Resolver }

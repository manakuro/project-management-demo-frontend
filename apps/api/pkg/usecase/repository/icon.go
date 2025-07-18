package repository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

// Icon is interface of repository
type Icon interface {
	Get(ctx context.Context, id model.ID) (*model.Icon, error)
	List(ctx context.Context) ([]*model.Icon, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.IconWhereInput) (*model.IconConnection, error)
	Create(ctx context.Context, input model.CreateIconInput) (*model.Icon, error)
	Update(ctx context.Context, input model.UpdateIconInput) (*model.Icon, error)
}

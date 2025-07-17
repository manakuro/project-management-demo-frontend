package repository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

// ArchivedActivity is interface of repository.
type ArchivedActivity interface {
	List(ctx context.Context, where model.ArchivedActivityWhereInput) ([]*model.ArchivedActivity, error)
}

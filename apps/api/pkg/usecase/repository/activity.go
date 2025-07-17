package repository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

// Activity is interface of repository
type Activity interface {
	List(ctx context.Context, where model.ActivityWhereInput) ([]*model.Activity, error)
}

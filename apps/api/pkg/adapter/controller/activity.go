package controller

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/usecase/usecase"
)

// Activity is an interface of controller.
type Activity interface {
	List(ctx context.Context, where model.ActivityWhereInput) ([]*model.Activity, error)
}

type activityController struct {
	activityUsecase usecase.Activity
}

// NewActivityController generates me controller.
func NewActivityController(u usecase.Activity) Activity {
	return &activityController{
		activityUsecase: u,
	}
}

func (c *activityController) List(ctx context.Context, where model.ActivityWhereInput) ([]*model.Activity, error) {
	return c.activityUsecase.List(ctx, where)
}

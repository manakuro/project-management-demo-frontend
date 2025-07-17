package controller

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/usecase/usecase"
)

// ArchivedActivity is an interface of controller.
type ArchivedActivity interface {
	List(ctx context.Context, where model.ArchivedActivityWhereInput) ([]*model.ArchivedActivity, error)
}

type archivedActivityController struct {
	archivedActivityUsecase usecase.ArchivedActivity
}

// NewArchivedActivityController generates me controller.
func NewArchivedActivityController(u usecase.ArchivedActivity) ArchivedActivity {
	return &archivedActivityController{
		archivedActivityUsecase: u,
	}
}

func (c *archivedActivityController) List(ctx context.Context, where model.ArchivedActivityWhereInput) ([]*model.ArchivedActivity, error) {
	return c.archivedActivityUsecase.List(ctx, where)
}

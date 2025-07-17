package controller

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/usecase/usecase"
)

// Mention is an interface of controller.
type Mention interface {
	List(ctx context.Context, where model.MentionWhereInput) ([]*model.Mention, error)
}

type mentionController struct {
	mentionUsecase usecase.Mention
}

// NewMentionController generates me controller.
func NewMentionController(u usecase.Mention) Mention {
	return &mentionController{
		mentionUsecase: u,
	}
}

func (c *mentionController) List(ctx context.Context, where model.MentionWhereInput) ([]*model.Mention, error) {
	return c.mentionUsecase.List(ctx, where)
}

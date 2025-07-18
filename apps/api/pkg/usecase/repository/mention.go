package repository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

// Mention is interface of repository
type Mention interface {
	List(ctx context.Context, where model.MentionWhereInput) ([]*model.Mention, error)
}

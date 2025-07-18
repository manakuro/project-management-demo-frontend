package repository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

// Me is interface of repository
type Me interface {
	Get(ctx context.Context, id model.ID) (*model.Me, error)
	Update(ctx context.Context, input model.UpdateMeInput) (*model.Me, error)
}

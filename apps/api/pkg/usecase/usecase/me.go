package usecase

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/usecase/repository"
)

type meUsecase struct {
	meRepository repository.Me
}

// Me is an interface of test user
type Me interface {
	Get(ctx context.Context, id model.ID) (*model.Me, error)
	Update(ctx context.Context, input model.UpdateMeInput) (*model.Me, error)
}

// NewMeUsecase generates test user repository
func NewMeUsecase(r repository.Me) Me {
	return &meUsecase{meRepository: r}
}

func (u *meUsecase) Get(ctx context.Context, id model.ID) (*model.Me, error) {
	return u.meRepository.Get(ctx, id)
}

func (u *meUsecase) Update(ctx context.Context, input model.UpdateMeInput) (*model.Me, error) {
	return u.meRepository.Update(ctx, input)
}

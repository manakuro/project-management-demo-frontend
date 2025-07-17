package usecase

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/usecase/repository"
)

type activityUsecase struct {
	activityRepository repository.Activity
}

// Activity is an interface of test user
type Activity interface {
	List(ctx context.Context, where model.ActivityWhereInput) ([]*model.Activity, error)
}

// NewActivityUsecase generates test user repository
func NewActivityUsecase(r repository.Activity) Activity {
	return &activityUsecase{activityRepository: r}
}

func (u *activityUsecase) List(ctx context.Context, where model.ActivityWhereInput) ([]*model.Activity, error) {
	return u.activityRepository.List(ctx, where)
}

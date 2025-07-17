package usecase

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/usecase/repository"
)

type archivedActivityUsecase struct {
	archivedActivityRepository repository.ArchivedActivity
}

// ArchivedActivity is an interface of test user
type ArchivedActivity interface {
	List(ctx context.Context, where model.ArchivedActivityWhereInput) ([]*model.ArchivedActivity, error)
}

// NewArchivedActivityUsecase generates test user repository
func NewArchivedActivityUsecase(r repository.ArchivedActivity) ArchivedActivity {
	return &archivedActivityUsecase{archivedActivityRepository: r}
}

func (u *archivedActivityUsecase) List(ctx context.Context, where model.ArchivedActivityWhereInput) ([]*model.ArchivedActivity, error) {
	return u.archivedActivityRepository.List(ctx, where)
}

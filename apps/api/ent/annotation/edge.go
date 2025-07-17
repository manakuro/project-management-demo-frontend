package annotation

// Edge is used to define update and create input generation in ./templates/mutation_input.tmpl
type Edge struct {
	FieldName string
}

// Name implements the Annotation interface.
func (e Edge) Name() string {
	return "Edge"
}

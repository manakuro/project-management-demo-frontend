import { useFormik, FormikConfig } from 'formik'
import React, { memo } from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from 'src/components/atoms'
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
} from 'src/components/organisms'
import { useCheckBoxMultiple, useInputText } from 'src/hooks/forms'
import { Label } from './Label'

type Props = {}

type Values = {
  name: string
  includeOption: string[]
}

export const Content: React.VFC<Props> = memo(() => {
  const formik = useFormik<Values>({
    initialValues: {
      name: 'Duplicate of 1111',
      includeOption: ['1'],
    },
    onSubmit: (values) => {
      console.log('values: ', values)
    },
    validate,
  })
  const { handleCheckBox, isChecked } = useCheckBoxMultiple<Values>({
    formik,
    name: 'includeOption',
  })
  const { fieldProps: taskNameFieldProps, isInvalid: isInvalidTaskName } =
    useInputText({
      formik,
      name: 'name',
    })

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalContent>
        <ModalHeader>Duplicate Task</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody py={4}>
          <Flex flexDirection="column">
            <Label>Task Name</Label>
            <FormControl isInvalid={isInvalidTaskName}>
              <Input {...taskNameFieldProps} fontSize="sm" />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
          </Flex>
          <Flex flexDirection="column" mt={6}>
            <Label>Include</Label>
            <Stack spacing={2} alignItems="flex-start">
              <Checkbox
                size="sm"
                value="1"
                isChecked={isChecked('1')}
                onChange={handleCheckBox}
              >
                Task Description
              </Checkbox>
              <Checkbox
                value="2"
                isChecked={isChecked('2')}
                onChange={handleCheckBox}
                size="sm"
              >
                Assignee
              </Checkbox>
              <Checkbox
                name="includeOption"
                value="3"
                isChecked={isChecked('3')}
                onChange={handleCheckBox}
                size="sm"
              >
                Subtasks
              </Checkbox>
              <Checkbox
                name="includeOption"
                value="4"
                isChecked={isChecked('4')}
                onChange={handleCheckBox}
                size="sm"
              >
                Tags
              </Checkbox>
              <Checkbox
                name="includeOption"
                value="5"
                isChecked={isChecked('5')}
                onChange={handleCheckBox}
                size="sm"
              >
                Collaborators
              </Checkbox>
              <Checkbox
                name="includeOption"
                value="6"
                isChecked={isChecked('6')}
                onChange={handleCheckBox}
                size="sm"
              >
                Projects
              </Checkbox>
              <Checkbox
                name="includeOption"
                value="7"
                isChecked={isChecked('7')}
                onChange={handleCheckBox}
                size="sm"
              >
                Due Date
              </Checkbox>
              <Checkbox
                name="includeOption"
                value="8"
                isChecked={isChecked('8')}
                onChange={handleCheckBox}
                size="sm"
              >
                Parent Task
              </Checkbox>
            </Stack>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            size="sm"
            type="submit"
            isDisabled={!formik.isValid}
          >
            Create New Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </form>
  )
})

const validate: FormikConfig<Values>['validate'] = (values) => {
  const errors: Partial<Values> = {}
  if (!values.name) {
    errors.name = 'Task Name Required'
  }

  return errors
}
Content.displayName = 'Content'

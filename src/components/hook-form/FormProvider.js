import PropTypes from 'prop-types';
// form
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

FormProvider.propTypes = {
  children: PropTypes.node,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

export default function FormProvider({ children, onSubmit, methods, className }) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className}>{children}</form>
    </Form>
  );
}

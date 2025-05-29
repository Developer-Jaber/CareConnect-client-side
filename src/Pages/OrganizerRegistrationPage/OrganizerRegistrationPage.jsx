import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  CircularProgress,
  Alert,
  Link,
  Box,
  styled
} from '@mui/material'

import axios from 'axios'

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  organization: z.string().min(2, 'Organization name is required'),
  organizationType: z.enum(['non-profit', 'community', 'educational', 'other']),
  description: z.string().min(20, 'Please provide more details'),
  website: z.string().url('Invalid URL').or(z.literal('')),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms' })
  })
})

// Styled components using MUI's modern styling system
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 12,
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4)
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5)
}))

export default function OrganizerRegistration () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationType: 'non-profit'
    }
  })

  const onSubmit = async data => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)
      setSubmitSuccess(false)

      // Simulate API call
      await axios
        .post('http://localhost:5000/create-organizer', data)
        .then(() => {
          setSubmitSuccess(true)
          reset() // Reset form on success
        })
        .catch(() => {
          setSubmitError('Something went wrong. Please try again.')
        })
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container maxWidth='md'>
      <StyledCard>
        <CardHeader
          title={
            <Typography variant='h4' component='h1' align='center'>
              Become an Organizer
            </Typography>
          }
          subheader={
            <Typography color='textSecondary' align='center'>
              Register your organization to post volunteer opportunities
            </Typography>
          }
        />

        <CardContent>
          {submitSuccess && (
            <Alert
              severity='success'
              onClose={() => setSubmitSuccess(false)}
              sx={{ mb: 3 }}
            >
              Registration successful! We've received your organizer
              application.
            </Alert>
          )}

          {submitError && (
            <Alert
              severity='error'
              onClose={() => setSubmitError(null)}
              sx={{ mb: 3 }}
            >
              {submitError}
            </Alert>
          )}

          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Box sx={{ mb: 2 }}>
              <TextField
                {...register('fullName')}
                label='Full Name'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />

              <TextField
                {...register('email')}
                label='Email'
                type='email'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                {...register('phone')}
                label='Phone Number'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />

              <TextField
                {...register('organization')}
                label='Organization Name'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.organization}
                helperText={errors.organization?.message}
              />
            </Box>

            <Typography variant='subtitle1' gutterBottom sx={{ mt: 2 }}>
              Organization Type
            </Typography>
            <RadioGroup
              {...register('organizationType')}
              defaultValue='non-profit'
              sx={{ mb: 2 }}
            >
              <FormControlLabel
                value='non-profit'
                control={<Radio />}
                label='Non-Profit Organization'
              />
              <FormControlLabel
                value='community'
                control={<Radio />}
                label='Community Group'
              />
              <FormControlLabel
                value='educational'
                control={<Radio />}
                label='Educational Institution'
              />
              <FormControlLabel
                value='other'
                control={<Radio />}
                label='Other'
              />
            </RadioGroup>
            {errors.organizationType && (
              <Typography color='error' variant='caption'>
                {errors.organizationType.message}
              </Typography>
            )}

            <TextField
              {...register('description')}
              label='Organization Description'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              margin='normal'
              error={!!errors.description}
              helperText={errors.description?.message}
              placeholder='Tell us about your organization and the type of volunteer opportunities you want to post...'
            />

            <TextField
              {...register('website')}
              label='Website (Optional)'
              variant='outlined'
              fullWidth
              margin='normal'
              error={!!errors.website}
              helperText={errors.website?.message}
            />

            <FormControlLabel
              control={<Checkbox {...register('terms')} color='primary' />}
              label={
                <Typography>
                  I agree to the{' '}
                  <Link href='#' underline='hover'>
                    Terms and Conditions
                  </Link>
                </Typography>
              }
              sx={{ mt: 2, mb: 2 }}
            />
            {errors.terms && (
              <Typography color='error' variant='caption' display='block'>
                {errors.terms.message}
              </Typography>
            )}

            <button
              type='submit'
              variant='contained'
              className='bg-[var(--secondary)] hover:bg-[#b8c7bf] mt-6 border-none w-full text-[#090109] md:text-xl btn btn-primary'
              size='large'
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color='inherit' />
                ) : null
              }
            >
              {isSubmitting ? 'Processing...' : 'Submit Application'}
            </button>
          </Box>
        </CardContent>
      </StyledCard>
    </Container>
  )
}

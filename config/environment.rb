# Load the Rails application.
require_relative "application"

ActionMailer::Base.smtp_settings = {
  from: ENV['GMAIL_USERNAME'],
  address: 'smtp.gmail.com',
  port: 465,
  authentication: 'plain',
  user_name: ENV['GMAIL_USERNAME'],
  password: ENV['GMAIL_PASSWORD'],
  domain: ENV['GMAIL_DOMAIN'],
  ssl: true
}

# Initialize the Rails application.
Rails.application.initialize!

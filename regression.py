import json
import requests
import pandas as pd
import numpy as np
import statsmodels.api as sm

# Fetch the JSON data from the server
response = requests.get('http://localhost:3000/jsonData')
json_data = json.loads(response.text)

# Extract the percentage count array from the JSON data
numbers_array = json_data

# Define the data as a dictionary
data = {"percentage count": numbers_array}

# Convert the dictionary to a Pandas DataFrame
df = pd.DataFrame(data)

# Define the dependent and independent variables
y = df["percentage count"]
x = np.arange(len(y))

# Add a constant to the independent variable array to represent the intercept term
x = sm.add_constant(x)

# Create the linear regression model and fit it to the data
results = sm.OLS(y, x).fit()

# Print the regression results summary
print(results.summary())

# Get the slope and intercept coefficients from the results
slope_coef = results.params[1]
intercept_coef = results.params[0]

# Print the equation for the linear regression model
print("The equation for the linear regression model is: y = {:.2f}x + {:.2f}".format(slope_coef, intercept_coef))

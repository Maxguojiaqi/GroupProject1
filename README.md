# GroupProject1

# Title: Master Home Cook
**User Story**:
```
AS A user

I WANT to be able to get recipe information and video for an ingredient that am interested in

SO THAT I can be aware of the calories and cooking methodology for that ingredient.


### Acceptance criteria

I should have an option to enter any ingredient in the ingredients input section.

I should also be able to select the diet type, meal type from the respective menus.

I am provided with at least three choices of videos for the recipes along with calories and 
cooking time(in minutes) information.

When I select one of the video choice it should play the you tube video.
```
**Team Members**:

```
Member 1: Max Guo, Maxguojiaqi, https://github.com/Maxguojiaqi

Member 2: Josh Babu George, joshb4u, https://github.com/joshb4u/

Member 3: Sujatha Mallela, sujatha-m, https://github.com/sujatha-m/
```
**High Level Description**:
```
### Motivation

Wondering how to get the right blend of ingredients that make up a nutritious
and balanced diet for a calorie conscious you? Meet Master Home Cook!

### Overview

An application that displays Master Home Cook welcome page with multiple options like 
ingredients,calories,cook time,diet type and meal type for the user to enter. The results are 
obtained by making calls to ThirdParty APIs to fetch and process the received data.

Master Home Cook suggests top 3 recipes based on user input preference.Then,depending on the 
recipe selected, Master Home Cook plays the youtube video.

### Technologies Used

* Semantic UI
* CSS
* HTML
* JavaScript
* jQuery
* AJAX
* YouTube API
* Edamam API
* GitHub

### Instructions:

Enter the ingredients, calories,cook time, diet type and meal type and then click on search 
button.
User will be provided top three recipes with cooking instructions.
User can choose one of the option to watch a video of that particular receipe.
User could also select other recipe choices to see corresponding video playback option.
Once done with video, user can refresh the page to go back to homepage.

### Functionality

The application has been designed based on the following criteria:-

When the user enters Ingredients, calories, cook time, diet type and meal type in the input
form and clicks on the search button, the backend javascript function uses the inputs to 
make a request to

1. Edamam API to fetch the recipe image along with cooking instructions
2. You tube API to fetch the data consisting of selected recipe video
```
**Two APIs**:
```
Edamam API: https://developer.edamam.com/

Youtube Search API: https://azure.microsoft.com/en-us/services/cognitive-services/bing-video-search-api/
```
**Front End Framework**:
```
Semantic UI: https://semantic-ui.com/
```
**BasicWireFrame**:

![wireframe](./utilities/wireframe.jpg)

**The following images demonstrate the application functionality:**

![Entry page with Input](./utilities/images/2.userinput.png)

![Shows the options](./utilities/images/3.showstheoptions.png)

![Video playing](./utilities/images/5.video.png)

**Project Presentation Slides**:

{<iframe src='https://docs.google.com/presentation/d/1lmEFuBThleAO5sTXW21FcoUpw-99Cs93W1NOZrfMYSA/edit#slide=id.g722b068323_0_1976' width='100%' height='600px' frameborder='0'>
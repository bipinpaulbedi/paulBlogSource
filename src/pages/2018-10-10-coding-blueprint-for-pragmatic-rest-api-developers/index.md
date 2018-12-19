---
title: Developers guide to designing REST endpoints
categories: design-patterns
tags: [api, design, design-patterns, article]
comments: true
subTitle: coding bluprint for pragmatic rest api developers
date: "2018-10-10T00:00:00.000Z"
---

As per Wikipedia, Design thinking is the cognitive process from which design concepts (e.g. ideas for products) emerge. Design thinking is related to, but is different from problem-solving, decision-making, creativity, sketching and prototyping. During design thinking, the designer's attention oscillates between their understanding of a problem context and their ideas for a solution. New solution ideas lead to a deeper understanding of the problematic context, which in turn triggers more solution ideas.

When your focus acts like a pendulum between problem context and the creative solution then you are bound to wear multiple hats. The irony as the developer when designing API is that your clients are other developers.
Over the past decade after working under some fine mentors the summary of the learning can be stated as “Think of developing API endpoints for a command line interface, possibly it will result in self-understandable, complete solution you are seeking”.

This post is inspired by eBook published by APIgee highlighting the best practiced for REST design. As an API designer, I have gone through some challenges myself, viz.

**What should be my base URL?**

Keep it short and simple. Try to use nouns and keep verbs out of your base URL. To smartly cover all possible scenario use HTTP verb standard.
Eg.

|Resource   |POST             |GET       |PUT                      |DELETE          |
|-----------|:---------------:|:--------:|:-----------------------:|:--------------:|
|           |create           |read      |update                   |delete          |
|/users     |create a new user|list users|bulk update users        |delete all users|
|/users/1234|error            |show user |update if exists or error|delete user     |

The point is that developers probably don't need the chart to understand how the API behaves. They can experiment with and learn the API without the documentation.

**Shall I use plurals or singular nouns?**

The recommended practice is to use plurals since the first API being tested by developers is most probably GET and GET /users to list all users make natural sense. Irrespective whatever you choose, be consistent to avoid confusing your API consumers. Moreover, concrete names are better than abstract ones. Eg. Having an endpoint like /blogs or /videos over abstract names like /items or /contents can help the consumer to identify resources more conveniently.  
You also want to expose a manageable number of resources. Aim for concrete naming and keep the number of resources between 12 and 24.

**How should the relations and associations be exposed in API?**

Resource always have relationships with other resources. oData standard makes it easier for developers to navigate resource and its association using metadata, it can be also let to exposing your information schema.  
The recommended practise is to follow ‘resource/identity/resource’ model eg. /users/1234/department. It's not uncommon to see people string these together making a URL 5 or 6 levels deep. Remember that once you have the primary key for one level, you usually don't need to include the levels above because you've already got your specific object.

**How do we handle the complexity of pagination, partial response, filters etc.?**

Make it simple for developers to use the base URL by putting optional states and attributes behind the query string question mark. E.g. GET /users?name=xxx  
For pagination request for limit and offset eg. GET /users?limit=50&offset=100 additionally, request fields to make it precise. Avoid using special characters in the query string. A good API always have defaults for pagination.  
Good example /GET users?fields=name,gender  
Bad example /Get users:(name,gender)  
We also suggest including metadata with each response that is paginated that indicated to the developer the total number of records available. Use JSON-LD/HAL/Collection+JSON/SIREN/JSONAPI.ORG specifications as your starting point and don’t forget to be creative.

**What is the recommended practice for error handling?**

The developers learn to write code through error and trial, most important they rely on error messages during critical times for troubleshooting and resolving issues.  
As the best practice always serve the error messages with correct HTTP status codes, also include a verbose error message with as many details as possible. We highly recommend that you add a link in your description to add more information.  
In certain circumstances the framework used by developer intercepts the message and follows the default routine, thus developer may have no opportunity to inform his user appropriately. Thus, if you can provide a flag to suppress the status code and result in HTTP - 200 OK with actual status code and the message passed along with the payload.

**Shall we version control the API?**

Never release an API without a version and make the version mandatory. Keep the version naming simple and maintain compatibility with at least one version backwards for minimum 6-12 months.  
Some developers advocate as to keep the version information in headers. But API can have breaking changes, thus being verbose and explicitly specifying version numbers in URL can help developers identify gaps early.

**What about responses that don’t involve resources?**

In certain cases, API calls that sends a response which is not a resource e.g. Calculate, Translate are not uncommon depending on the domain.
In these cases, Use verbs not nouns e.g. /convert?from=USD&to=AUD&amount=100  
Make it clear in your API documentation that these “non-resource” scenarios are different, maybe in you swagger docs.  
    
**How many formats shall we support?**

Respect the HTTP header content-type and accepts e.g. Accept: application/json but let the user override using dot notation e.g. GET /user/1234.dat or GET /user/1234.xml  
If the default form is JSON, in the response properties try using camelCase for attributes as it is easier for the front-end developer to parse into objects with standard JavaScript conventions.

**Any other tips and tricks?**

_Tip1:_  
A simple can be verb based resourceful API but for complex scenarios use google model
e.g.  
/search?q=xxx  
/user?q=xxx  
/location/1234/user=xxx – scoped  
/search.xml?q=xxx – formatted  

_Tip2:_  
Consolidate API under a single domain with segregation for environments following a standard pattern e.g.
api.xxx.com
uat-api.xxx.com
dev-api.xxx.com

_Tip3:_  
Use standard known authentication/authorization methodologies e.g. oAuth2.0 etc

_Tip4:_  
Try to complement your API with SDK

_Tip5:_  
Using POST to emulate PUT, DELETE, PATCH. If your development platform or firewall rules prevent you from calling HTTP methods like PUT, PATCH or DELETE, use the X-HTTP-Method-Override header. Pass the method you want to use in the X-HTTP-Method-Override header and make your call using the POST method

**What API design pattern is an ideal choice in most cases?**

The architect must carefully evaluate available options and what suits the business domain and skill set of available developers in terms of project support and maintainability. But in most cases, an API Façade with mediate to complement can cover the majority of cases. This is covered in detail in another post.

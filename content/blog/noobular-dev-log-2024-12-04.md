---
title: "Noobular dev log | 2024 Dec 4"
date: 2024-12-04T15:00:00-06:00
draft: false
---

In the last 2-3 weeks I've been continuing to work on [Noobular](https://noobular.com) ([code](https://github.com/alecchendev/noobular)). See last week's post for the motivation, but the gist: it's sort of like duolingo, brilliant, math academy, etc. but anyone can upload content. I've been making solid progress and wanted to share.

Here's a demo:

<iframe width="560" height="315" src="https://www.youtube.com/embed/0Y09kL2Hxik?si=eUuFbhRZfcb1ktTH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Tech stack
The app uses htmx for the frontend, golang for the main application logic, and sqlite for the DB. It's hosted on a raspberry pi plugged into the wall 10 ft from my desk. Traffic is routed through to my home network via cloudflare tunnels. All these tools have been a pleasure to work with so far! I've been especially surprised with how easy it's been to host a website from a raspberry pi. And at first I was running bitcoin core on the pi and things were kind of slow, but once it finished initial block download, things have been running very smoothly. I sort of suspected the SD card disk speed would be kinda slow but it seems to be working just fine (well, again this site has 0 traffic). [0]

### Auth
A big feature for this latest release has been authentication. In the beginning, I just wanted to get the basic content system in place--creating courses, rendering them, taking courses, storing answers--and there were no accounts, i.e. everyone was the same omni-student-teacher user. Now you can sign up for an account, and so other people can't mess with your courses, or take courses for you.

I implemented passkey authentication, which was cool. No need for me to store sensitive data on my end, and users (that don't use a password manager..) don't need to remember an extra thing. With HTMX I have been avoiding using javascript to get a feel for doing things the *htmx way*, but WebAuthn forced me to compromise and paste a big blob of JS. Oh well.

I use a simple JWT for a session cookie. I remember using JWTs for this [spotify-social](https://github.com/alecchendev/spotify-social/tree/master) project I did, and having no idea how they worked, but that somehow they just did the thing. Now with more understanding, I see it's a pretty neat, simple application of digital signatures/HMACs. One way of implementing session tokens is to generate a session cookie and store it in our DB, and check the user includes that cookie in their request. But with JWTs, we can generate a single secret for our server, and issue tokens (just signed/HMAC'd metadata) for users, and statelessly verify a session token for a user came from us. This comes with the tradeoff that if someone compromises that secret, they could issue session tokens without us knowing, which would be bad. There are some improvements I could make here, but until I have users I won't worry about it too much.

### Module versioning
In this app, courses are just a title, description, and a set of modules. Modules are just a title, description, and a set of blocks. Blocks can be either a question with choices, or a piece of content (in markdown).

Now, say you're a teacher and want to edit a module. You want to add choices to a question, or edit a content block, or add a new question. When students go to take this module, they should just see the latest edits. But what if a student has already taken this module and wants to review it? What if they're in the middle of the module? If you change the module, what does their choice B to question X mean now?

This was an important issue. At first my solution was to simply delete all student's answers whenever a module was edited. It's not great UX but it prevented any weirdness for the time being. But eventually I came to a set of desired behaviors:

- If a student begins a module (including if they have completed it), they should be pinned to how the module was when they started.
- Students seeing the module for the very first time should see the latest version.

And my solution for implementing this is module versioning. All my blocks/content/questions are tied to a certain module version, and if you've started a module, I track in the DB the version that you're on, and pin you to that. Any time a teacher edits a module, it creates a new version.

I initially was reluctant to do this because it seems like storing a bunch of data redundantly, but in reality I don't think it will really result in that. You can delete any old version that a student isn't pinned to (I haven't done this yet, but will at some point), so at max you only need to store a version for each student which doesn't seem crazy. Additionally, you don't need to store duplicates for the same content (this one I did implement). Again, what I think here really doesn't mean anything since this is just a side project, but it's more fun to consider things sincerely.

### Testing
This is getting to be a bigger project for a singular person like me to manage, and I definitely have introduced a fair share of regressions while working on this lately. So I wanted to implement some sort of testing. I wanted to test just some core functionality, and I've found that with server-side rendering testing the whole application has been much easier/more practical than I thought. On the DB side, sqlite allows you to create an in-memory DB which is nice, even though creating a db in /tmp for every test would have sufficed. For testing the general functionality, I simply just run my full server in a goroutine, and make http requests to it. [1] I'm then able to use helper methods on my DB client to check DB state, or simply make another request to my server to get the contents displayed on the page. I can simply assert certain strings show up, and that's been working great. I've already caught a bunch of regressions through these, and they run swimmingly with a simple `go test ./...`. Here's an example test to show what I mean:

```go
func TestEditCourse(t *testing.T) {
	ctx := startServer()
	defer ctx.Close()

	user := ctx.createUser()
	client := newTestClient(t).login(user.Id)

	course := db.NewCourse(-1, "hello", "goodbye")
	modules := []db.ModuleVersion{
		db.NewModuleVersion(-1, -1, 0, "module title1", "module description1"),
		db.NewModuleVersion(-1, -1, 0, "module title2", "module description2"),
	}

	client.createCourse(course, modules)
	courseId := 1

	body := client.getPageBody("/teacher")
	assert.Contains(t, body, editCourseRoute(courseId))

	newCourse := db.NewCourse(courseId, "new title", "new description")
	newModules := []db.ModuleVersion{
		db.NewModuleVersion(-1, 1, 1, "new module title1", "new module description1"),
		db.NewModuleVersion(-1, 2, 1, "new module title2", "new module description2"),
	}
	client.editCourse(newCourse, newModules)

	for _, route := range []string{"/teacher", editCoursePageRoute(courseId)} {
		body = client.getPageBody(route)
		assert.Contains(t, body, newCourse.Title)
		assert.Contains(t, body, newCourse.Description)
		for _, module := range newModules {
			assert.Contains(t, body, module.Title)
			assert.Contains(t, body, module.Description)
		}
	}
}

```

---

[0] Reading up on sqlite a bit has also lead me to realize that the entire DB is probably cached in memory given how small the DB has been so this is probably not any reflection at all for the disk speed.

[1] As I write this I realized I broke my tests when I enabled TLS in my last commit lol.

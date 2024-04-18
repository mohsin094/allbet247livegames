<template>
  <div id="section-6">
    <div class="contactinfo">
      <div class="content-contact">
        <div class="container content-box">
          <div class="two_third_contact lastcolumn">
            <div id="blockTitle7" class="block_title">
              <h2>Contact <span class="secondtxt">us</span></h2>
              <h3 class="subtitle_poker">
                Proin gravida nibh vel velit auctor aliqued
              </h3>
            </div>
            <div id="contact_Form">
              <form method="post" id="contact_form">
                <section id="contact" class="contact-select">
                  <div class="info_maps">
                    <section class="first">
                      <ul class="contactsidebar">
                        <li>
                          <i class="fa fa-home"></i><span>Address: </span>2A4 UD
                          Street Name, Punta Cana
                        </li>
                        <li>
                          <i class="fa fa-phone"></i><span>Phone: </span>(+44)
                          66-997-12341
                        </li>
                      </ul>
                    </section>
                  </div>
                </section>

                <div class="name">
                  <label for="name">Your Name:</label>
                  <input
                    id="name"
                    name="email"
                    type="text"
                    placeholder="e.g. Mr. John Doe"
                    required
                  />
                </div>
                <div class="email">
                  <label for="email">Your Email:</label>
                  <input
                    id="email"
                    name="emai"
                    type="text"
                    placeholder="example@domain.com"
                    required
                  />
                </div>
                <div class="message">
                  <label for="message">Your Message:</label>
                  <textarea
                    name="messagetext"
                    id="message"
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
                <div id="loader">
                  <input type="submit" value="Submit" />
                </div>
                <p class="success">Your message has been sent successfully.</p>
                <p class="error">
                  E-mail must be valid and message must be longer than 20
                  characters.
                </p>

                <section class="social_align">
                  <ul class="socials fr">
                    <li>
                      <a href="#"><i class="fa fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-facebook"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-google-plus"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
                </section>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../../assets/home/css/share_style.css);
@import url(../../assets/home/css/normalize.css);
@import url(../../assets/home/css/layout1_style.css);
@import url(../../assets/home/css/layout2_style.css);
@import url(../../assets/home/css/blog.css);
@import url(../../assets/home/css/font-awesome-4.0.1/css/font-awesome.min.css);
</style>

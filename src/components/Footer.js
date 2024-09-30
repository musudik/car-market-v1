import React from 'react';

const Footer = () => {
  return (
    // <footer style={styles.footer}>
    //   <p>© {new Date().getFullYear()} Car Marketplace. All rights reserved.</p>
    // </footer>

		<footer id="contact"  class="contact">
			<div class="container">
				<div class="footer-top">
					<div class="row">
						<div class="col-md-4 col-sm-6">
							<div class="single-footer-widget">
                                <h2>contact</h2>
								<ul>
									<li><a href="#">info@thecarmarket.com</a></li>
									<li><a href="#">+32 465 176 485</a></li>
								</ul>
							</div>
						</div>
						<div class="col-md-4 col-sm-6">
							<div class="single-footer-widget">
								<h2>about</h2>
								<ul>
									<li><a href="#">about us</a></li>
									<li><a href="#">terms <span> of service</span></a></li>
									<li><a href="#">privacy policy</a></li>
								</ul>
							</div>
						</div>
						<div class="col-md-4 col-sm-6">
							<div class="single-footer-widget">
								<h2>news letter</h2>
								<div class="footer-newsletter">
									<p>
										Subscribe to get latest updates & news
									</p>
								</div>
								<div class="hm-foot-email">
									<div class="foot-email-box">
										<input type="text" class="form-control" placeholder="Add Email"/>
									</div>
									<div class="foot-email-subscribe">
										<span><i class="fa fa-arrow-right"></i></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="footer-copyright">
					<div class="row">
						<div class="col-sm-6">
							<p>
								&copy; copyright.designed and developed by <a href="https://www.themesine.com/">themesine</a>.
							</p>
						</div>
						<div class="col-sm-6">
							<div class="footer-social">
								<a href="#"><i class="fa fa-facebook"></i></a>	
								<a href="#"><i class="fa fa-instagram"></i></a>
								<a href="#"><i class="fa fa-linkedin"></i></a>
								<a href="#"><i class="fa fa-pinterest-p"></i></a>
								<a href="#"><i class="fa fa-behance"></i></a>	
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="scroll-Top">
				<div class="return-to-top">
					<i class="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
				</div>
				
			</div>
			
        </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%'
  }
};

export default Footer;
